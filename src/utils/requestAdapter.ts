/*
  response isp/b=>新规范
    转换前：
      1)isp:
        {
            code: 10000
            data: {data: []}
            msg: "处理成功"
            success: true
        }
      2)b端:
        {
            code,
            data :{data : []},
            message,
            result:'success'
        }
      3)b端:
        {
            code,
            data :{list : []},
            message,
            result:'success'
        }
    转换后：
    {
        code,
        data :{list : []},
        message,
        result:'success'
    }
*/

interface AfterProps {
  result?: string;
  data: object | null;
}
//{...obj}扩展运算符实现对象的深拷贝
export const resOldToNew = ({ ...obj }) => {
  const { code, data } = obj;
  let transData;
  if (data) {
    if (data.list) {
      //情况3
      return obj;
    }
    if (data.data) {
      transData = {
        list: data.data,
        ...data,
      };
      delete transData.data;
    }
  }
  if (obj.result) {
    //情况2
    const after: AfterProps = {
      ...obj,
      data: data ? (data.data ? transData : data) : data,
    };

    // hack
    // 之前的接口，空数据是fail，现在要手动改成success
    if (obj.result === 'fail' && obj.message === '查无数据') {
      after.result = 'success';
      after.data = null;
    }
    return after;
  } else {
    //情况1
    const { msg: message, success } = obj;
    const after = {
      code,
      data: data ? (data.data ? transData : data) : data,
      message,
      result: success ? 'success' : 'fail',
    };
    return after;
  }
};

/*
request 新规范=>isp/b

  
转换前：
  {
    orderMethod: "desc"(后端默认)
    orderType: "createTime"(后端默认)
    pageNum: 1
    pageSize: 10
    parameters: {...}
  }

转换后：
1)b端 
  {
    pageSize: 10,
    pageNum: 1,
    orderType: 'createTime', 
    orderMethod: 'desc',
    params:{..}
  };
  */

export const reqToB = ({ ...obj }) => {
  const { orderMethod, orderType, pageNum, pageSize, parameters: params } = obj;
  const after = { orderMethod, orderType, pageNum, pageSize, params };
  if (!params) {
    delete after.params;
  }
  return after;
};

/*
转换后
  {
    pageIndex: 1,
    pageSize: 10,
    sort: 'createTime',
    dir: 'desc',
    dealerChannelID: '',
    dealerChannelName: '',
    useState: 1,
  };
*/
export const reqToISP = ({ ...obj }) => {
  const { orderMethod: dir, orderType: sort, pageNum: pageIndex, pageSize, parameters } = obj;
  const after = { dir, sort, pageIndex, pageSize, ...parameters };
  return after;
};

// // 新规范适配函数
// {
//   orderMethod: "desc"(后端默认)
//   orderType: "createTime"(后端默认)
//   pageNum: 1
//   pageSize: 10
//   parameters: {...}
// }
export const reqAdapter = (
  parameters,
  pageNum = 1,
  pageSize = 10,
  orderType = 'createTime',
  orderMethod = 'desc',
) => {
  return {
    parameters,
    pageNum,
    pageSize,
    orderType,
    orderMethod,
  };
};

// module.exports = {
//   reqAdapter,
//   resOldToNew,
//   reqToISP,
//   reqToB
// };
