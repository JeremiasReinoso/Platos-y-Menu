(function(){
  const base={restaurants:window.PLATO_RESTAURANTS||[],categories:window.PLATO_CATEGORIES||[],products:window.PLATO_PRODUCTS||[]},overrides=window.PLAStorage.read('data-overrides',{});
  function merge(collection){const local=overrides[collection]||[];if(!Array.isArray(local))return base[collection];const localById=new Map(local.map(item=>[item.id,item]));const merged=base[collection].map(item=>{const localItem=localById.get(item.id)||{};const result={...item,...localItem};if(collection==='products'&&!localItem.model3d){result.model3d=item.model3d;result.model3dEnabled=item.model3dEnabled;}return result;});return merged.concat(local.filter(item=>!base[collection].some(baseItem=>baseItem.id===item.id)));}
  function merged(){return{restaurants:merge('restaurants'),categories:merge('categories'),products:merge('products')};}
  function saveData(data){window.PLAStorage.write('data-overrides',data);}
  function updateData(collection,items){const data=merged();data[collection]=items;saveData(data);return data;}
  function removeData(collection,id){const data=merged();data[collection]=data[collection].filter(item=>item.id!==id);saveData(data);return data;}
  window.PLAData={base,merged,saveData,updateData,removeData,restaurant(slug){return merged().restaurants.find(r=>r.slug===slug||r.id===slug);},categories(restaurantId){return merged().categories.filter(c=>c.restaurantId===restaurantId).sort((a,b)=>a.order-b.order);},products(restaurantId){return merged().products.filter(p=>p.restaurantId===restaurantId);},product(slug){return merged().products.find(p=>p.slug===slug||p.id===slug);}};
})();
