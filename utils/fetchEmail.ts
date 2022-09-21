import { FormData } from "../typings"

export const fetchEmail = async (formData: FormData) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`, {
        method: 'POST',
        body: JSON.stringify(formData)
    }).then((res) => {
        console.log('Response received')
        if (res.status === 200) {
            console.log('Response succeeded!')
        } 
        return res.status
    })
}