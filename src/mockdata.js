import Mock from 'mockjs';
import searchfirewall from './mock/searchfirewall.json';
import searchconpot from './mock/searchconpot.json';
import searchmonitor from './mock/searchmonitor.json';
import searchdecision from './mock/searchdecision.json';
import searchlog from './mock/searchlog.json';
import foaf from './mock/foaf.json';

function getServiceIP()
{
    return 'http://10.42.0.220:9999/xbrain';
}

function mockAll()
{
    
    
    console.log("[hahaha]"+searchconpot);
    Mock.mock("http://10.42.0.220/mock/foaf", foaf);
    
    //return;
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
            "result":[
                {
                    "password":"root",
                    "flag":1,
                    "domain":"xbrain-1",
                    "ip":"10.42.0.133",
                    "id":1,
                    "state":"Running",
                    "user":"root",
                    "url":"tcp://10.42.0.133:2378",
                    "docker":"v18.03.1-ce",
                    "info":""
                },
                {
                    "password":"root",
                    "flag":1,
                    "domain":"xbrain-2",
                    "ip":"10.42.0.113",
                    "id":2,
                    "state":"Running",
                    "user":"root",
                    "url":"tcp://10.42.0.113:2378",
                    "docker":"v18.03.1-ce",
                    "info":""
                },
                {
                    "password":"root",
                    "flag":1,
                    "domain":"xbrain-3",
                    "ip":"10.42.0.135",
                    "id":3,
                    "state":"Running",
                    "user":"root",
                    "url":"tcp://10.42.0.135:2378",
                    "docker":"v18.03.1-ce",
                    "info":""
                }
        ]
    });
    Mock.mock(getServiceIP() + "/docker/listcontainer", {
        
            status:"success",
            message: "成功获取容器名称",
            container: [
                {
                    Id: "001",
                    Names: ["/suspicious_kowalevski"],
                    Labels: {},
                    Command: "/usr/bin/sh",
                    ImageID: "sha256:fw",
                    State: "stopped"
                },
                {
                    Id: "002",
                    Names: ["/sad_meninsky"],
                    Labels: {},
                    Command: "/usr/bin/sh",
                    ImageID: "sha256:hp",
                    State: "running"
                },
                {
                    Id: "003",
                    Names: ["/sad_meninsky"],
                    Labels: {},
                    Command: "/usr/bin/sh",
                    ImageID: "sha256:dao",
                    State: "running"
                }

            ]

      });
    Mock.mock(getServiceIP() + "/docker/listcontainer2", {
        result: {
            status: "success",
            message: "成功获取容器名称",
            container: [
                {
                    Id: "Black",
                    Names: ["/suspicious_kowalevski"],
                    Labels: {},
                    Command: "/usr/bin/sh",
                    ImageID: "sha256:fw",
                    State: "is-stopped"
                },
                {
                    Id: "Board",
                    Names: ["/sad_meninsky"],
                    Labels: {},
                    Command: "/usr/bin/sh",
                    ImageID: "sha256:hp",
                    State: "is-running"
                }

            ]

        }
    });
    Mock.mock(getServiceIP() + "/docker/listimage", {
        "status":"success",
        "message":"成功获取镜像名称",
        "images":[
            {
                "Id":"sha256:fa05455e1a18ab3a578dba39fc268895baa22a453f13a0358c13b6a9ac1e9d9c",
                "Labels":{},
                "RepoTags":[
                    "10.42.0.220:5000/lmsensorsbeat:latest"
                ]
            },
            {
                "Id":"sha256:f0874c9b66a1c571fe73d6907dbdc02d9eba31325d0e32f4e4f227a67c261ad2",
                "Labels":{},
                "RepoTags":[
                    "10.42.0.220:5000/metricbeat:latest"
                ]
            },
            {
                "Id":"sha256:c82521676580c4850bb8f0d72e47390a50d60c8ffe44d623ce57be521bca9869",
                "Labels":{
                    "maintainer":"NGINX Docker Maintainers <docker-maint@nginx.com>"
                },
                "RepoTags":[
                    "nginx:latest"
                ]
            },
            {
                "Id":"sha256:8b89e48b5f157d9455c963b57c85d21e2337c58b8c983bc06f88476610adc129",
                "Labels":{
                    "maintainer":"NGINX Docker Maintainers <docker-maint@nginx.com>"
                },
                "RepoTags":null
            },
            {
                "Id":"sha256:54a1d1e6f009f150c85c5ced86d1973600992bbd253fa87bb839e78243ce032f",
                "Labels":null,
                "RepoTags":[
                    "10.42.0.220:5000/pot:v2"
                ]
            },
            {
                "Id":"sha256:fb2f3851a97186bb0eaf551a40b94782712580c2feac0d15ba925bef2da5fc18",
                "Labels":null,
                "RepoTags":[
                    "10.42.0.220:5000/httpd:v1"
                ]
            }
        ]
    });

    Mock.mock(getServiceIP() + "/action/listimages", {
        "repositories":[
            {
                "tags":[
                    "latest"
                ],
                "name":"10.42.0.220:5000/conpot"
            },
            {
                "tags":[
                    "v1"
                ],
                "name":"10.42.0.220:5000/httpd"
            },
            {
                "tags":[
                    "latest"
                ],
                "name":"10.42.0.220:5000/lmsensorsbeat"
            },
            {
                "tags":[
                    "latest",
                    "v2"
                ],
                "name":"10.42.0.220:5000/metricbeat"
            },
            {
                "tags":[
                    "latest"
                ],
                "name":"10.42.0.220:5000/waf-all"
            },
            {
                "tags":[
                    "latest"
                ],
                "name":"10.42.0.220:5000/waf-zero"
            }
        ]
    });

    Mock.mock(getServiceIP() + "/logger/searchfirewall",searchfirewall);
    Mock.mock(getServiceIP() + "/logger/searchconpot", searchconpot);
    Mock.mock(getServiceIP() + "/logger/searchmonitor", searchmonitor);
    Mock.mock(getServiceIP() + "/logger/searchdecision", searchdecision);
    Mock.mock(getServiceIP() + "/logger/searchlog", searchlog);
}

export{
    mockAll,
    getServiceIP
}