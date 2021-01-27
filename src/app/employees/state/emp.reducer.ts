const initialState = {
    user: [
        {
            "id": "18",
            "title": "Mr.",
            "firstname": "kaushik",
            "lastname": "Gupta",
            "job": "trainee Engineer",
            "company": "Mindfire",
            "phone": {
                "Mobile": "8789037367"
            },
            "email": {
                "Personal": "kaushik867@gmail.com"
            }
        }
    ],
    loading: false,
    loaded: true
}

export function empReducer(state = initialState, action) {
    
    switch(action.type){
        case "LOAD_EMP" :{
            return{
                ...state,
                loading:true,
                loaded:false
            }
        }
        default:{
            return state;
        }
    }
}