import Tips from './index.vue'

Tips.install = function(Vue){
    Vue.component(Tips.name, Tips);
}

export default Tips