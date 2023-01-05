// 导入 svg 下面的 所有 .svg
const files = import.meta.glob(`/src/assets/icons/svg/*.svg`);

const name = []
Object.keys(files).forEach((c)=> {
  c=c.substring(c.lastIndexOf('/') + 1, c.length).split(".svg").join('');
  // 到处svg所有类名
  name.push(c)
})
export default name