'use client';

import UseEditRentModal from "@/app/hooks/useEditRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";

import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


enum STEPS {
  DESCRIPTION=0,
  INFO = 1,
  IMAGES = 2,
  PRICE =3,

}


const EditRentModal = () => {
  const router = useRouter();
  const rentModal = UseEditRentModal();
  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
      errors,
    },
    reset,

  } = useForm<FieldValues>({
    defaultValues : {
      category : '',
      location : null,
      minDayGuestCount: 1,
      minNightGuestCount: 1,
      maxDayGuestCount: 1,
      maxNightGuestCount: 1,
      roomCount : 1,
      bathroomCount : 1,
      imageSrc :[],
      minDayPrice : 1,
      minNightPrice:1,
      title : '',
      description: ''


    }
  });
  const category = watch('category')
  const minDayGuestCount = watch('minDayGuestCount')
  const maxDayGuestCount = watch('maxDayGuestCount')
  const minNightGuestCount = watch('minNightGuestCount')
  const maxNightGuestCount = watch('maxNightGuestCount')
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');


  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

  const setCustomValue = (id:string, value: any) =>{
    setValue (id,value,{
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })


  }


  const onBack = () => {
    setStep((value)=>value-1);
  }
  const onNext = () =>{
    setStep((value) => value+1)
  }

 const onSubmit: SubmitHandler<FieldValues> =(data) =>{
  if(step !== STEPS.PRICE){
    return onNext()
  }
  setIsLoading(true);
  axios.post('/api/listing', data)
  .then(()=> {
    toast.success('Listing Created');
    router.refresh()
    reset();
    setStep(STEPS.DESCRIPTION);
    rentModal.onClose();


  })
  .catch(()=>{
    toast.error('Something went Wrong');
  }).finally(()=>{
    setIsLoading(false);
  })
  

 }

    const actionLabel = useMemo(()=>{
      if(step === STEPS.PRICE){
        return 'Create'
      }
      return 'Next'
    },[step]);

    const secondaryActionLabel = useMemo(()=>{
      if (step ===STEPS.DESCRIPTION){
        return undefined;
      }
      return 'Back';
    },[step])
 

    let bodyContent=(
      <div className=" flex flex-col gap-8">
       <Heading
      title ="Describe your Place"
      subtitle="More Information about your place"
       
       /> 
  
  <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
        "
        >
          {categories.map((item)=>(
            <div key={item.label} className="col-span-1">
              <CategoryInput
              onClick= {(category)=>setCustomValue('category', category)}
              selected ={category===item.label} 
              label={item.label}
              icon={item.icon}
              />
  
  
            </div>
          ))}
  
        
       
  
       <Input
       id="title"
       label = "Title"
       disabled ={isLoading}
       register ={register}
       errors={errors}
       required
       
       
       />
       <hr />
       <Input
       id="description"
       label = "Description"
       disabled ={isLoading}
       register ={register}
       errors={errors}
       required
       
       
       />
  
  
  
  
  
  
  
      </div>
  
      </div>
  
    )


if (step===STEPS.INFO){
  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
      title="Share some Basic about your place"
      subtitle="What Amenities do you have?"
      
      />
      <Counter
      title="Day Cruise Minimum Guest"
      subtitle="How many guests for Day Cruise"
      value={minDayGuestCount}
      onChange={(value) => setCustomValue('minDayGuestCount', value)}
      />
  <hr/>

  <Counter
      title="Day Cruise Maximum Guest"
      subtitle="How many Guest for Day Cruise"
      value={maxDayGuestCount}
      onChange={(value) => setCustomValue('maxDayGuestCount', value)}
      />
       <hr/>
       <Counter
     title="Night Cruise Minimum Guest"
      subtitle="How many Bathrooms"
      value={minNightGuestCount}
      onChange={(value) => setCustomValue('minNightGuestCount', value)}
      />
       <hr/>
       <Counter
     title="Night Cruise Maximum Guest"
      subtitle="How many Bathrooms"
      value={maxNightGuestCount}
      onChange={(value) => setCustomValue('maxNightGuestCount', value)}
      />
       <hr/>
  <Counter
      title="Number of rooms"
      subtitle="How many rooms you have"
      value={roomCount}
      onChange={(value) => setCustomValue('roomCount', value)}
      />
  <hr/>
  <Counter
      title="Number of Bathrooms"
      subtitle="How many Bathrooms"
      value={bathroomCount}
      onChange={(value) => setCustomValue('bathroomCount', value)}
      />
       <hr/>

     
    </div>
  )
 
}
  if (step===STEPS.IMAGES){
      bodyContent =(
        <div className="flex flex-col gap-8">
          <Heading
          title="Add Photo of your place"
          subtitle="Show guests what your place looks like!"
          
          />
          <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
          />
        </div>
      )

  }

        if(step===STEPS.DESCRIPTION){
          bodyContent=(
            <div className=" flex flex-col gap-8">
             <Heading
            title ="Describe your Place"
            subtitle="More Information about your place"
             
             /> 

             <Input
             id="title"
             label = "Title"
             disabled ={isLoading}
             register ={register}
             errors={errors}
             required
             
             
             />
             <hr />
             <Input
             id="description"
             label = "Description"
             disabled ={isLoading}
             register ={register}
             errors={errors}
             required
             
             
             />





            </div>



          )
        }

if (step===STEPS.PRICE){
  bodyContent=(
    <div className="flex flex-col gap-8">
    <Heading
    title="Set your Price"
    subtitle="How much do you charge per night"
    />
    <Input
    id= "minDayPrice"
    label = "Day Cruise Rate"
    formatPrice
    type="number"
    disabled = {isLoading}
    register={register}
    errors={errors}
    required
    />
    <hr />
    
    <Input
    id= "minNightPrice"
    label = "Night Cruise Rate"
    formatPrice
    type="number"
    disabled = {isLoading}
    register={register}
    errors={errors}
    required
    />
    
  
  </div>

  )
}

  
  return (
   <Modal 
   isOpen = {rentModal.isOpen}
   onClose = {rentModal.onClose}
   onSubmit = {handleSubmit(onSubmit)}
   actionLabel={actionLabel}
   secondaryActionLabel={secondaryActionLabel}
   secondaryAction = {step===STEPS.DESCRIPTION ? undefined : onBack}
   title="Airbnb your home"
   body = {bodyContent}
   />
   
  )
}

export default EditRentModal