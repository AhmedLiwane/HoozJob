import { LOAD_LANG, FAIL_LANG } from "../actionTypes";
import {FR,EN} from '../../assets/Languages/langue'

export const loadLang = () =>async  (dispatch) => {
      let result = await navigator.language || navigator.userLanguage;
      if (result ==="en-US") dispatch({ type: LOAD_LANG, payload: EN }); 
      else if (result ==="fr-FR") dispatch({ type: LOAD_LANG, payload: FR });
      else
      dispatch({ type: FAIL_LANG, payload: "Cant find language" });
    
  };