import { DateTime } from "luxon"

export default {
    isNumber (n){
        if(isNaN(n)){return false}
        if (typeof n === "number") { return true }
        return false
    },
    isString (s){
        if (typeof s === 'string') { return true }
        return false
    },
    dateStringIsValid(str){
        if(str===null){return true}
        if(DateTime.fromFormat(str,'yyyy-MM-dd').isValid){
            return true
        }
        return false
    },
    isObject(objValue) {
        return objValue && typeof objValue === 'object' && objValue.constructor === Object;
      }
}