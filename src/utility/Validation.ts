interface CheckValidationProps {
    value: string;
    regex: RegExp;
}

export const CheckValidation = ({ value, regex }: CheckValidationProps) => {
    return regex.test(value) ? true : false
}