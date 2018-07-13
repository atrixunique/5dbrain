import Mock from 'mockjs';

function getServiceIP()
{
    return 'http://10.42.0.85:8080/';
}
function mockAll()
{
    Mock.mock(getServiceIP() + "getImageList", {
        body: [
            {
                id: '001',
                name: 'ABC',
                sha: 'c3d92-3',
                size: '116.5 MB',
                create: '2018-02-02',
                nodes:[]
            },
            {
                id: '002',
                name: 'CBA',
                sha: 'c3d92-3',
                size: '116.5 MB',
                create: '2018-02-02',
                nodes:[]
            },
            {
                id: '003',
                name: 'DDD',
                sha: 'c3d92-3',
                size: '116.5 MB',
                create: '2018-02-02',
                nodes:[]
            }
        ]
    });
    Mock.mock(getServiceIP() + "getImageDetail", {
        body: {
                id: '00'+"@int(0,9)",
                label: 'Nginx Honeypot Image',
                sha: '@guid',
                size: '116.5 MB',
                created: '@time',
                os:'ubuntu',
                architecture:'x86',
                cmd:'@csentence(5,10)'
            }
    });
    Mock.mock(getServiceIP() + "getSlaveList", {
        body: {
            count:2, 
            slaves:[
                {
                    nodename:'SLAVE01',
                    ip:'10.42.0.151',
                    imagesCount: 3,
                    countainersCount: 3,
                    eventsCount: 500
                },
                {
                    nodename: 'SLAVE02',
                    ip: '10.42.0.152',
                    imagesCount: 2,
                    countainersCount: 4,
                    eventsCount: 500
                }
            ]
        }
    });
    Mock.mock(getServiceIP() + "getImageDeployed", {
        body: [{
                name:"ABC",
                nodes: [
                    '10.42.0.150',
                    '10.42.0.151']
                },
            {
                name: "CBA",
                nodes: [
                    '10.42.0.151']
            },
            {
                name: "DDD",
                nodes: [
                    '10.42.0.150',
                    '10.42.0.151']
            }
        ] 
    });

}

export{
    mockAll,
    getServiceIP,
}