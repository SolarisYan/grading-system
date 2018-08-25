import { Context } from 'koa';
import { BaseCtrl } from './base';
import { UserModel } from '../models/user';
import { handleError, handleSuccess } from '../../utils/handle';

export class UserCtrl {
  public model = UserModel;

  public static async login(ctx: Context) {
    const userBody: any = ctx.request.body;
    const {workNumber, password} = userBody;

    const user: any = await UserModel.findOne({ workNumber: workNumber }).catch(err => {
      console.log(err);
      ctx.throw(500, '查找数据时出错!');
    });

    if (!user) {
      ctx.status =400;
      handleError({ctx, message: '用户不存在!'});
    }
    user.comparePassword(password, (error, isMatch) => {
      if (!isMatch) {
        ctx.status =400;
        handleError({ctx, message: '密码错误!'});
      } else {
        // const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        // res.status(200).json({ token: token });
        console.log('ok');
      }
    });
  }

  public static async register(ctx: Context) {
    const userBody: any = ctx.request.body;
    const {workNumber} = userBody;

    const user: any = await UserModel.find({workNumber: workNumber}).catch(err => {
      console.log(err);
      ctx.throw(500, '查找数据时出错!');
    });
    // console.log(user);
    if (user.length) {
      ctx.status = 409;
      handleError({ctx, message: '用户名已存在!'});
    } else {
      const user = new UserModel(userBody);
      // console.log('new user:');
      // console.log(user);
      await user.save().catch(err => {
        console.log(err);
        ctx.throw(500, '保存数据库时出错')
      });
      handleSuccess({ctx, message: '创建成功!'});
    }
  }

}
