const express=require('express')
const router= express.Router();
const{getAllProducts,getAllProductsTesting,findDuration,findEnrolled,findLessons,findLevels,findPrice}=require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/Testing').get(getAllProductsTesting)

router.route('/duration').get(findDuration)
// router.route('/enrolled').get(findEnrolled)
router.route('/price').get(findPrice)
router.route('/levels').get(findLevels)
router.route('/lessons').get(findLessons)



module.exports=router;