# fruitsShop

uni-app 写的一个水果商城小程序 前端模板

目录结构

```
fruitsShop
    ├─ common/              # 公用工具库文件
    ├─ components/          # uni-app组件目录
    ├─ hybrid/              # 存放本地网页的目录
    ├─ pages/               # 业务页面文件存放的目录
    │  ├─ index/            # 首页
    │  │  ├─ index.vue      
    │  ├─ order/            # 订单
    │  │  ├─ index.vue      
    │  ├─ search/           # 搜索
    │  │  ├─ index.vue      
    │  ├─ shopCart/         # 购物车
    │  └─ ...     
    ├─ platforms/           # 存放各平台专用页面的目录
    ├─ static               # 存放应用引用静态资源（如图片、视频等）的目录
    ├─ unpackage/           # 打包目录
    ├─ wxcomponents/        # 存放小程序组件的目录
    ├─ App.vue              # 应用配置，用来配置App全局样式以及监听
    ├─ main.js              # Vue初始化入口文件s
    ├─ manifest.json        # 配置应用名称、appid、logo、版本等打包信息
    ├─ package.json         # 配置页面路由、导航条、选项卡等页面类信息
	└─ README.md
```

![image-20210801234348543](https://pic2.zhimg.com/80/v2-8ee20d7dd3a58f88bceee94d6df1fcf1_720w.png)

![image-20210801234402455](https://pic2.zhimg.com/80/v2-1a071743b93bc52f41afe1fc7f5f8daa_720w.png)

```
echo "# fruitsShop" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:kuishou68/fruitsShop.git
git push -u origin main
```

