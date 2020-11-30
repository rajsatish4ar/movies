
export const isEmailValid=(text) =>{
    if (!text || text.length < 1) {
      return false
    }
    var regex = new RegExp(
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    );
    if (regex.test(text)) {
      return true;
    } else {
      return false;
    }
  }

  export function isNameValid(text) {
    if (!text || text.length < 1) {
      return false;
    } else if (text.length < 3) {
      return false;
    }
    var regex = new RegExp(/^[A-Za-z .]{3,50}$/);
    if (regex.test(text)) {
      return true;
    } else {
      return false;
    }
  }

  export function isValueNullOrEmpty(value) {
    var isValue = false;
    if (value && value.toString) {
      value = value.toString();
    }
    if (
      value == null ||
      value == '' ||
      value == '.' ||
      value == 'null' ||
      value == undefined ||
      value.trim().length == 0
    ) {
      isValue = true;
    }
    return isValue;
  }
  