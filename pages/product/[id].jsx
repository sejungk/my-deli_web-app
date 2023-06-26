// import styles from "../../styles/Product.module.css";
// import Layout from "../../component/Layout";
// // import styles from "../../app/globals.css";

// const Product = () => {
//   const eggSandwich = {
//     id: 1,
//     name: "Breakfast Egg Sandwich",
//     price: [2.49, 4.59, 6.00],
//     desc: "Breakfast Egg Sandwich with your choice of meat, cheese, and bread."
//   };

//   return (
//     <Layout>
//     <div className={styles.container}>
//       <div className={styles.scrollableContent}>
//         <div className={styles.itemName}>
//           <h1 className={styles.title}>{eggSandwich.name}</h1>
//           <p className={styles.desc}>{eggSandwich.desc}</p>
//         </div>
//         <hr></hr>

//         <div className={styles.optionSection}>
//           <div className={styles.optionWrapper}>
//             <div className={styles.optionDesc}>
//               <h5>Choose your bread</h5>
//               <div className={styles.requiredOptionalLabel}>REQUIRED</div>
//             </div>

//             <div className={styles.optionChoices}>

//               <div className={styles.listOption}>
//                 <label>
//                   <input className={styles.option} type="radio" value="White" name="bread" /> White
//                 </label>
//                 <div>---</div>
//               </div>

//               <div className={styles.listOption}>
//                 <label>
//                   <input className={styles.option} type="radio" value="White" name="bread" /> Wheat
//                 </label>
//                 <div>---</div>
//               </div>

//               <div className={styles.listOption}>
//                 <label>
//                   <input className={styles.option} type="radio" value="White" name="bread" /> Rye
//                 </label>
//                 <div>---</div>
//               </div>

//               <div className={styles.listOption}>
//                 <label>
//                   <input className={styles.option} type="radio" value="White" name="bread" /> Sourdough
//                 </label>
//                 <div>---</div>
//               </div>

//             </div>
//           </div>

//           <hr className={styles.sectionDivider}></hr>

//           <div className={styles.optionWrapper}>
//             <div className={styles.optionDesc}>
//               <h5>Add Cheese</h5>
//               <div className={styles.requiredOptionalLabel}>OPTIONAL</div>
//             </div>

//             <div className={styles.optionChoices}>

//               <div className={styles.listOption}>
//                 <label>
//                   <input type="radio" value="american" name="cheese" /> American Cheese
//                 </label>
//                 <div>---</div>
//               </div>

//               <div className={styles.listOption}>
//                 <label>
//                   <input type="radio" value="swiss" name="cheese" /> Swiss
//                 </label>
//                 <div>---</div>
//               </div>

//             </div>
//           </div>

//           <hr className={styles.sectionDivider}></hr>

//           <div className={styles.optionWrapper}>
//             <div className={styles.optionDesc}>
//               <h5>Add meat</h5>
//               <div className={styles.requiredOptionalLabel}>OPTIONAL</div>
//             </div>

//             <div className={styles.optionChoices}>

//               <div className={styles.listOption}>
//                 <label>
//                   <input type="radio" value="turkey" name="meat" /> Turkey
//                 </label>
//                 <div>---</div>
//               </div>

//               <div className={styles.listOption}>
//                 <label>
//                   <input type="radio" value="ham" name="meat" /> Ham
//                 </label>
//                 <div>---</div>
//               </div>

//               <div className={styles.listOption}>
//                 <label>
//                   <input type="radio" value="bacon" name="meat" /> Bacon
//                 </label>
//                 <div>---</div>
//               </div>

//               <div className={styles.listOption}>
//                 <label>
//                   <input type="radio" value="sausage" name="meat" /> Sausage
//                 </label>
//                 <div>---</div>
//               </div>

//             </div>
//           </div>

//           </div>
//         </div>

//         <hr></hr>
//         <div className={styles.addToOrderSection}>
//           <div className={styles.quantity}>
//             <span>-</span>
//             <span>1</span>
//             <span>+</span>
//           </div>
//           <div className={styles.addToOrderBttn}>
//             <span>Add to Order</span>
//             <span>|</span>
//             <span>$3.99</span>
//           </div>
//         </div>

//     </div>
//     </Layout>
//   )
// }

// export default Product;
