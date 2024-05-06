import { Button } from 'flowbite-react';


export default function CallToAction() {
   
    const goto=()=>
        {
            window.open('https://github.com/bips555', '_blank');
        }
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about Me?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these Projects I have made using various javascript frameoworks and libraries
            </p>
            <Button gradientDuoTone='purpleToPink' 
            onClick={goto}
            className='rounded-tl-xl rounded-bl-none'>
              Projects
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
        </div>
    </div>
  )
}