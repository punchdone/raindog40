const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const roleSchema = new Schema(
  {
      role: {
          type: String,
          required: 'Please supply a role title',
          trim: true
      }
  },
);

roleSchema.pre('save', async function () {
    try {
        const Role = this.constructor;
        const roleExists = await role.find({
            role: this.get('role')
        })
            .lean()
            .exec()
        if (userExists.length > 0) {
            throw new Error ({ message: 'A new role error (part 1).' });
        }
    } catch {
        throw new Error ({ message: 'A new role error (part 2)' });
    }
});

module.exports =
    mongoose.models.role || mongoose.model('role', roleSchema);