import Vue from 'vue'
export function time (date) {
  let dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
}

export function length (value) {
  if (value instanceof Array){
    return value.length;
  } else{
    return 0
  }
}

export function page(value) {
  if (value instanceof Number){
    return parseInt(value/10);
  } else{
    return 1
  }
}

const filters = {
  time,
  length,
  page
}
export default filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
