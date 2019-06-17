module.exports = {
    publicPath: '',
    pluginOptions: {
      cordovaPath: 'app'
    },
    devServer: {
      proxy: {
        '/passport/login':{  //  登录
          target:'http://192.168.1.8:8080/',
          changeOrigin:true,
        },
        '/nodes':{  // 获取所有节点 - /nodes/0
          target:'http://192.168.1.8:8080/',
          changeOrigin:true,
        },
        '/node':{  // 获取单个节点
          target:'http://192.168.1.8:8080/',
          changeOrigin:true,
        },
        'admin/updateNodeInfo':{  // 修改节点信息
          target:'http://192.168.1.8:8080/',
          changeOrigin:true,
        },
        '/admin/changePassword':{ // 修改密码
          target:'http://192.168.1.8:8080/',
          changeOrigin:true,
        },
        '/passport/logout':{  // 退出登录
          target:'http://192.168.1.8:8080/',
          changeOrigin:true,
        },
        '/admin/changeUsername':{  // 设置用户名
          target:'http://192.168.1.8:8080/',
          changeOrigin:true,
        },
        'admin/nodePass':{  // 管理员审核 - 通过
          target:'http://192.168.1.8:8080/',
          changeOrigin:true,
        },
        'admin/nodeReject':{  // 管理员审核 - 拒绝
          target:'http://192.168.1.8:8080/',
          changeOrigin:true,
        }
      }
    }
  }