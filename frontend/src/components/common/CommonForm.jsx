import {Input} from '../ui/input';
import {Label} from '../ui/label';
import {Textarea} from '../ui/textarea';
import { Button } from "../ui/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../ui/select";
import PasswordStrengthMeter from '@/components/common/PasswordStrengthMeter.jsx';

export default function CommonForm({formControls, formData,
                                      setFormData, onSubmit, buttonText, isBtnDisabled, hasMeter}) {


   function renderInputsByComponentType(getControlItem) {
      let element = null;
      const value = formData[getControlItem.name] || '';

      switch (getControlItem.componentType) {
         case 'input':
            element = (
               <Input
                  name={getControlItem.name}
                  placeholder={getControlItem.placeholder}
                  id={getControlItem.name}
                  type={getControlItem.type}
                  value={value}
                  onChange={(event) =>
                     setFormData({
                        ...formData,
                        [getControlItem.name]: event.target.value
                     })
                  }
               />
            );

            break;
         case 'select':
            element = (
               <Select
                  onValueChange={(value) =>
                     setFormData({
                        ...formData,
                        [getControlItem.name]: value
                     })
                  }
                  value={value}
               >
                  <SelectTrigger className="w-full">
                     <SelectValue placeholder={getControlItem.label}/>
                  </SelectTrigger>
                  <SelectContent>
                     {getControlItem.options && getControlItem.options.length > 0
                        ? getControlItem.options.map((optionItem) => (
                           <SelectItem key={optionItem.id} value={optionItem.id}>
                              {optionItem.label}
                           </SelectItem>
                        ))
                        : null}
                  </SelectContent>
               </Select>
            );

            break;
         case 'textarea':
            element = (
               <Textarea
                  name={getControlItem.name}
                  placeholder={getControlItem.placeholder}
                  id={getControlItem.id}
                  value={value}
                  onChange={(event) =>
                     setFormData({
                        ...formData,
                        [getControlItem.name]: event.target.value
                     })
                  }
               />
            );

            break;

         default:
            element = (
               <Input
                  name={getControlItem.name}
                  placeholder={getControlItem.placeholder}
                  id={getControlItem.name}
                  type={getControlItem.type}
                  value={value}
                  onChange={(event) =>
                     setFormData({
                        ...formData,
                        [getControlItem.name]: event.target.value
                     })
                  }
               />
            );
            break;
      }

      return element;
   }

   return (
      <form onSubmit={onSubmit}>
         <div className="flex flex-col gap-3 mb-4">
            {formControls.map((controlItem) => (
               <div className="grid w-full gap-1.5" key={controlItem.name}>
                  <Label className="mb-1">{controlItem.label}</Label>
                  {renderInputsByComponentType(controlItem)}
               </div>
            ))}
         </div>
         {hasMeter && <PasswordStrengthMeter password={formData.password} />}

         <Button disabled={isBtnDisabled} type="submit" className="w-full bg-neutral-700 cursor-pointer">
            {buttonText || 'Submit'}
         </Button>
      </form>

   );
}