var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantScheduleSchema = new Schema({
    day: { type: String, required: true },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
});

module.exports = mongoose.model('RestaurantSchedule', RestaurantScheduleSchema);
