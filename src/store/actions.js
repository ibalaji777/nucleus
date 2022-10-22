const actions={

    createShift(context,payload){
        context.commit('createShift',payload)
    },
    createCompany(context,payload){
        context.commit('createCompany',payload)
    },
    checkCompany(context,payload){
        context.commit('checkCompany',payload)
    },
    createGroup(context,payload){
        context.commit('createGroup',payload)
    },
    setCompany(context,payload){
        context.commit('setCompany',payload)
    }


}


export default actions;