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
    Mock.mock(getServiceIP() + "/cluster/list", {
        result: [{
                domain: "xbrain-1",
                ip:"10.42.0.133",
                containers:"1/1",
                images:"2"
            },
            {
                domain: "xbrain-2",
                ip: "10.42.0.131",
                containers: "0/2",
                images: "3"
            },
            {
                domain: "xbrain-3",
                ip: "10.42.0.135",
                containers: "1/3",
                images: "1"
            }
        ]
    });
    Mock.mock(getServiceIP() + "/docker/listcontainer", {
        result: {
            status:"success",
            message: "成功获取容器名称",
            container: [
                {
                    Id: "001",
                    Names: ["/suspicious_kowalevski"],
                    Labels: {},
                    Command: "/usr/bin/sh",
                    ImageID: "sha256:fw",
                    State: "is-stopped"
                },
                {
                    Id: "002",
                    Names: ["/sad_meninsky"],
                    Labels: {},
                    Command: "/usr/bin/sh",
                    ImageID: "sha256:hp",
                    State: "is-running"
                },
                {
                    Id: "003",
                    Names: ["/sad_meninsky"],
                    Labels: {},
                    Command: "/usr/bin/sh",
                    ImageID: "sha256:dao",
                    State: "is-running"
                }

            ]

        }
    });

    Mock.mock(getServiceIP() + "/action/listimages", {
        "repositories": [
            {
                tags: [
                    "v1"
                ],
                "name": "10.42.0.220：5000/httpd"
            },
            {
                tags: [
                    "1.0",
                    "v2",
                    "latest"
                ],
                "name": "10.42.0.220：5000/pot"
            }
        ]
    });



}

export{
    mockAll,
    getServiceIP,
}