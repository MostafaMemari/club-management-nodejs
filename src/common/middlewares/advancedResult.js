module.exports.advancedResult = (model, populate) => {
  return async (req, res, next) => {
    let Query = model.find();
    // convert query string to number
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const total = await model.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Filtering / searching
    console.log(req.query.search);
    if (req.query.search) {
      Query = Query.find({
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { lastName: { $regex: req.query.search, $options: "i" } },
          { nationalCode: { $regex: req.query.search, $options: "i" } },
        ],
      })
        .populate("clubID")
        .populate("beltID")
        .populate("ageGroupID");

      // Query = Query.find({
      //   firstName: { $regex: req.query.firstName, $options: "i" },
      // });
    }

    // poppulate
    // if (populate) {
    //   Query = Query.populate("clubID");
    //   Query = Query.populate("beltID");
    //   Query = Query.populate("ageGroupID");
    // }

    // pagination result
    const pagination = {};
    // add next
    if (endIndex < total) pagination.next = { page: page + 1, limit };
    // add prev
    if (startIndex > 0) pagination.prev = { page: page - 1, limit };

    const results = await Query.find().limit(limit).skip(skip).select("-password");

    res.result = {
      total,
      pagination,
      results: results.length,
      status: "success",
      message: "دریافت اطلاعات با موفقیت انجام شد",
      data: results,
    };

    next();
  };
};
