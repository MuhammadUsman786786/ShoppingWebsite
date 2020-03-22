import * as _ from 'lodash'

export const emptyValidation=(value,prefix)=>{
	if(_.isEmpty(value)){
		return `${prefix} is required`
	}
};
