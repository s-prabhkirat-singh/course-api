const product=require('../models/product')

const getAllProducts=async(req,res)=>{
    try {
        const { name, duration, enrolled, price, levels, lessons, category, instructor, review, sort, select } = req.query;
        let queryObject = {};
    
        if (name) {
            const nameValues = name.split(',').map(name => new RegExp(name.trim(), 'i'));
            queryObject.name = { $in: nameValues };
        }
        if (duration) {
            const durations = duration.split(',');
            queryObject.duration = { $in: durations };
        }
        if (enrolled) {
            const enrollments = enrolled.split(',');
            queryObject.enrolled = { $in: enrollments };
        }
        if (price) {
            const prices = price.split(',');
            queryObject.price = { $in: prices };
        }
        if (levels) {
            const levelValues = levels.split(',');
            queryObject.levels = { $in: levelValues };
        }
        if (lessons) {
            const lessonValues = lessons.split(',');
            queryObject.lessons = { $in: lessonValues };
        }
        if (category) {
            const categoryValues = category.split(',').map(category => new RegExp(category.trim(), 'i'));
            queryObject.category = { $in: categoryValues };
        }
        if (instructor) {
            const instructorValues = instructor.split(',').map(instructor => new RegExp(instructor.trim(), 'i'));
            queryObject.instructor = { $in: instructorValues };
        }
        if (review) {
            const reviews = review.split(',');
            queryObject.review = { $in: reviews };
        }
    
        let myData = product.find(queryObject);
    
        if (sort) {
            const sortFields = sort.split(',').join(' ');
            myData = myData.sort(sortFields);
        }
        if (select) {
            const selectFields = select.split(',').join(' ');
            myData = myData.select(selectFields);
        }
    
        // Pagination
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 4;
        let skip = (page - 1) * limit;
    
        const totalProductsCount = await product.countDocuments(queryObject); // Count total documents matching the query
        const totalPages = Math.ceil(totalProductsCount / limit);
    
        myData = myData.skip(skip).limit(limit);
    
        const apiData = await myData;
    
        res.status(200).json({
            apiData,
            totalPages,
            currentPage: page,
            totalProductsCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    

   

   
 
    
  
};
const getAllProductsTesting=async(req,res)=>{
    try {
        const { name, duration, enrolled, price, levels, lessons, category, instructor, review, sort, select } = req.query;
        let queryObject = {};
    
        if (name) {
            const nameValues = name.split(',').map(name => new RegExp(name.trim(), 'i'));
            queryObject.name = { $in: nameValues };
        }
        if (duration) {
            const durations = duration.split(',');
            queryObject.duration = { $in: durations };
        }
        if (enrolled) {
            const enrollments = enrolled.split(',');
            queryObject.enrolled = { $in: enrollments };
        }
        if (price) {
            const prices = price.split(',');
            queryObject.price = { $in: prices };
        }
        if (levels) {
            const levelValues = levels.split(',');
            queryObject.levels = { $in: levelValues };
        }
        if (lessons) {
            const lessonValues = lessons.split(',');
            queryObject.lessons = { $in: lessonValues };
        }
        if (category) {
            const categoryValues = category.split(',').map(category => new RegExp(category.trim(), 'i'));
            queryObject.category = { $in: categoryValues };
        }
        if (instructor) {
            const instructorValues = instructor.split(',').map(instructor => new RegExp(instructor.trim(), 'i'));
            queryObject.instructor = { $in: instructorValues };
        }
        if (review) {
            const reviews = review.split(',');
            queryObject.review = { $in: reviews };
        }
    
        let myData = product.find(queryObject);
    
        if (sort) {
            const sortFields = sort.split(',').join(' ');
            myData = myData.sort(sortFields);
        }
        if (select) {
            const selectFields = select.split(',').join(' ');
            myData = myData.select(selectFields);
        }
    
        // Pagination
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 4;
        let skip = (page - 1) * limit;
    
        const totalProductsCount = await product.countDocuments(queryObject); // Count total documents matching the query
        const totalPages = Math.ceil(totalProductsCount / limit);
    
        myData = myData.skip(skip).limit(limit);
    
        const apiData = await myData;
    
        res.status(200).json({
            apiData,
            totalPages,
            currentPage: page,
            totalProductsCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}    

    

    
//   const myData= await product.find(req.query).select('name price')
//   res.status(200).json({myData})


// router.route('./price').get(findPrice)
// router.route('./levels').get(findLevels)
// router.route('./lessons').get(findLessons)

const findDuration=async(req,res)=>{
    try {
        // Step 4: Extract lt and gt parameters from the URL query
        const lt = req.query.lt;
        const gt = req.query.gt;
    
        // Step 5: Use Mongoose queries with $lt and $gt operators
        let query = {};
        if (lt) {
          query.duration = { $lt: lt };
        }
        if (gt) {
          query.duration = { ...query.duration, $gt: gt };
        }
    
        const apiData = await product.find(query);
    
        // Step 6: Return the results to the client
        res.status(200).json(apiData);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const findEnrolled=async(req,res)=>{
    try {
        // Step 4: Extract lt and gt parameters from the URL query
        const lt = req.query.lt;
        const gt = req.query.gt;
    
        // Step 5: Use Mongoose queries with $lt and $gt operators
        let query = {};
        if (lt) {
          query.enrolled = { $lt: lt };
        }
        if (gt) {
          query.enrolled = { ...query.enrolled, $gt: gt };
        }
    
        const apiData = await product.find(query);
    
        // Step 6: Return the results to the client
        res.json(apiData);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const findPrice=async(req,res)=>{
    try {
        // Step 4: Extract lt and gt parameters from the URL query
        const lt = req.query.lt;
        const gt = req.query.gt;
    
        // Step 5: Use Mongoose queries with $lt and $gt operators
        let query = {};
        if (lt) {
          query.price = { $lt: lt };
        }
        if (gt) {
          query.price = { ...query.price, $gt: gt };
        }
    
        const apiData = await product.find(query);
    
        // Step 6: Return the results to the client
        res.json(apiData);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const findLevels=async(req,res)=>{
    try {
        // Step 4: Extract lt and gt parameters from the URL query
        const lt = req.query.lt;
        const gt = req.query.gt;
    
        // Step 5: Use Mongoose queries with $lt and $gt operators
        let query = {};
        if (lt) {
          query.levels = { $lt: lt };
        }
        if (gt) {
          query.levels = { ...query.levels, $gt: gt };
        }
    
        const apiData = await product.find(query);
    
        // Step 6: Return the results to the client
        res.json(apiData);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const findLessons=async(req,res)=>{
    try {
        // Step 4: Extract lt and gt parameters from the URL query
        const lt = req.query.lt;
        const gt = req.query.gt;
    
        // Step 5: Use Mongoose queries with $lt and $gt operators
        let query = {};
        if (lt) {
          query.lessons = { $lt: lt };
        }
        if (gt) {
          query.lessons = { ...query.lessons, $gt: gt };
        }
    
        const apiData = await product.find(query);
    
        // Step 6: Return the results to the client
        res.json(apiData);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
module.exports={getAllProducts,getAllProductsTesting,findDuration,findEnrolled,findLessons,findLevels,findPrice};