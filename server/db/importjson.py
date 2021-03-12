import json

with open('trt.out') as json_file:
    lis = json_file.readlines()
    d = []
    for line in lis:
        nest = json.loads(line)
        d.append(json.loads(nest['msg']))
    last = d[-1]
    print(d[-1]['header'])
    print(d[-1]['date'])
    print(d[-1]['text'])
    
