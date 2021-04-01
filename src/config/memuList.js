import {
    HomeOutlined,
    ShopOutlined,
    WalletOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
} from '@ant-design/icons';

/*
    导航数据抽离出来
*/

const memuList = [
    {
        title: '首页',
        icon: <HomeOutlined />,
        key: '/home',
    },
    {
        title: '商品',
        icon: <ShopOutlined />,
        key: '/shop',
        children: [
            {
                title: '品类管理',
                icon: <WalletOutlined />,
                key: '/category',
            },

            {
                title: '商品管理',
                icon: <ShoppingCartOutlined />,
                key: '/product',
            },
        ],
    },
    {
        title: '用户管理',
        icon: <UserOutlined />,
        key: '/user',
    },
    {
        title: '角色管理',
        icon: <UsergroupAddOutlined />,
        key: '/role',
    },
    {
        title: '图形图表',
        icon: <AreaChartOutlined />,
        key: '/charts',
        children: [
            {
                title: '柱形图',
                icon: <BarChartOutlined />,
                key: '/charts/bar',
            },
            {
                title: '折线图',
                icon: <LineChartOutlined />,
                key: '/charts/line',
            },
            {
                title: '饼状图',
                icon: <PieChartOutlined />,
                key: '/charts/pie',
            },
        ],
    },
];

export default memuList;

//                         <SubMenu key="/charts" icon={<AreaChartOutlined />} title="图形图表">
//                             <Menu.Item key="/charts/bar" icon={<BarChartOutlined />}>
//                                 <Link to="/charts/bar">
//                                     柱形图
//                                 </Link>
//                             </Menu.Item>
//                             <Menu.Item key="/charts/line" icon={<LineChartOutlined />}>
//                                 <Link to="/charts/line">
//                                     折线图
//                                 </Link>
//                             </Menu.Item>
//                             <Menu.Item key="/charts/pie" icon={<PieChartOutlined />}>
//                                 <Link to="/charts/pie">
//                                     饼状图
//                                 </Link>
//                             </Menu.Item>
//                         </SubMenu>
