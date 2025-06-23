import { getCookie } from "@/utility/getCookie"

const MyCourses = () => {

    const token = getCookie('auth_token');
    console.log(token);

    return (
        <div>

        </div>
    )
}

export default MyCourses
