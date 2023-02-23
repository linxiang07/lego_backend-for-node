import { Service } from 'egg'
import { Schema } from 'mongoose'
interface DogResp {
  message: string;
  status: string;
}
export default class DogService extends Service {

  async show() {
    const resp = await this.ctx.curl<DogResp>('https://dog.ceo/api/breeds/image/random', {
      dataType: 'json'
    })
    return resp.data
  }

  async getPersonModel() {
    const app = this.app
    const UserSchema = new Schema({
      name: { type: String },
      age: { type: Number },
      hobby: { type: Array },
      userid: { type: String },
      address: { type: String },
      team: { type: Schema.Types.ObjectId, ref: 'Team' },
    }, { collection: 'user' });
    return app.mongoose.model('User', UserSchema);
  }

  async showPlayers() {
    const PersonModel = this.getPersonModel();
    const result = await (await PersonModel).find({ age: { $gt: 30 } }).exec();
    return result;
  }

}
