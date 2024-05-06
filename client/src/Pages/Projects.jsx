import CallToAction from "../Components/CalltoAction.jsx"
export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-md text-gray-500 flex flex-col'>I have made superb projeccts using javascript framework and libraries.
      <span className="text-center">Check it out!</span></p>
      <CallToAction />
    </div>
  )
}