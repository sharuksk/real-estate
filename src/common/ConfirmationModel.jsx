import { VscAccount, VscSignOut } from "react-icons/vsc";

export default function ConfirmationModal({modalData}){
    return (
        <>
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-green-200 bg-opacity-10 backdrop-blur-sm">
   
         <div className="w-11/12 max-w-[400px] h-[200px] rounded-lg border border-black bg-white p-6">
         <div className="flex flex-row ">
         <p className="text-2xl font-semibold">
{modalData?.text1}
</p>
<p className=" text-2xl font-semibold"> 
{modalData?.text2}
</p>
    </div>  

<div className="flex flex-row gap-10 items-center mb-10">
    <button onClick={modalData?.button1Handler}
    >{modalData?.btn1text}</button>
    <button onClick={modalData?.button2Handler}>
   {modalData?.btn2text}
   </button>
</div>
           </div>
            </div>
</>
    )
}