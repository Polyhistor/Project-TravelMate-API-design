const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverView = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from step 1

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  console.log(req.params.slug);
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: `review rating user`,
  });

  res.status(200).render('tour', {
    title: `Tour | ${tour.name}`,
    tour,
  });
});

// a) define route
// 1) get the data, for th requested tour (include reviews and guides)
// 2) build template
// 3) render template using data from 1
