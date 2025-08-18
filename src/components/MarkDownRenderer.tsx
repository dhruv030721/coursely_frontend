import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) {
    return <div className="text-gray-400">No description available</div>;
  }

  // ✅ Normalize MDX output (handle escaped \n, backslashes, etc.)
  const normalizeMDXContent = (raw: string) => {
    return raw
      .replace(/\\n/g, '\n')                 // turn "\n" into real newlines
      .replace(/\\\\/g, '\\')                // unescape double backslashes
      .replace(/\\\*/g, '*')                 // unescape \*
      .replace(/\\_/g, '_')                  // unescape \_
      .replace(/\\([A-Za-z0-9]+)\\/g, '$1'); // remove \word\ patterns
  };

  // ✅ Inline markdown (bold, italic, etc.)
  const formatInlineMarkdown = (text: string) => {
    return (
      text
        .replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="font-semibold text-white bg-green-950/90 px-1 rounded">$1</strong>'
        )
        .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic text-gray-300">$1</em>')
    );
  };

  // ✅ Main parser
  const parseMarkdown = (text: string) => {
    const normalized = normalizeMDXContent(text);
    const lines = normalized.split('\n');

    let html = '';
    let inList = false;
    let listItems: string[] = [];
    let listType = '';

    const closeList = () => {
      if (inList) {
        html += listType === 'ul'
          ? `<ul class="space-y-1 my-4 pl-0">${listItems.join('')}</ul>`
          : `<ol class="space-y-1 my-4 pl-0">${listItems.join('')}</ol>`;
        inList = false;
        listItems = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Empty line
      if (!line) {
        closeList();
        html += '<br />';
        continue;
      }

      // Headers
      if (line.startsWith('### ')) {
        closeList();
        html += `<h3 class="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 mt-4 sm:mt-6 first:mt-0">${line.substring(4)}</h3>`;
      } else if (line.startsWith('## ')) {
        closeList();
        html += `<h2 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 mt-6 sm:mt-8 first:mt-0">${line.substring(3)}</h2>`;
      } else if (line.startsWith('# ')) {
        closeList();
        html += `<h1 class="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 mt-6 sm:mt-8 first:mt-0">${line.substring(2)}</h1>`;
      }
      // Blockquotes
      else if (line.startsWith('> ')) {
        closeList();
        html += `<blockquote class="border-l-4 border-green-500 bg-green-950/20 pl-4 py-3 my-4 rounded-r-lg"><p class="text-green-200 font-medium text-sm sm:text-base mb-0">${line.substring(2)}</p></blockquote>`;
      }
      // Unordered list
      else if (line.startsWith('- ')) {
        if (!inList || listType !== 'ul') {
          closeList();
          inList = true;
          listType = 'ul';
        }
        const itemContent = line.substring(2);
        listItems.push(
          `<li class="text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base flex items-start"><span class="text-green-400 mr-2 mt-1">•</span><span>${formatInlineMarkdown(itemContent)}</span></li>`
        );
      }
      // Ordered list
      else if (/^\d+\. /.test(line)) {
        if (!inList || listType !== 'ol') {
          closeList();
          inList = true;
          listType = 'ol';
        }
        const match = line.match(/^(\d+)\. (.*)$/);
        if (match) {
          const [, num, itemContent] = match;
          listItems.push(
            `<li class="text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base flex items-start"><span class="text-green-400 mr-2 font-medium min-w-[1.5rem]">${num}.</span><span>${formatInlineMarkdown(itemContent)}</span></li>`
          );
        }
      }
      // Paragraph
      else {
        closeList();
        html += `<p class="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">${formatInlineMarkdown(line)}</p>`;
      }
    }

    // Close final list if needed
    closeList();

    return html;
  };

  return (
    <div
      className="prose prose-invert max-w-none leading-relaxed"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
};

export default MarkdownRenderer;
