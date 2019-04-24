# -*- coding: utf-8 -*-
# @Author: Gao_Sir
# @Date:   2018-07-23 17:27:35
# @Last Modified by:   Gao_Sir
# @Last Modified time: 2018-08-09 15:35:25

import win32com.client

# print 输出
'''

print('Gao_Sir is a talent!')
print('A B C','D E F','G')
print('10 + 8 =', 10 + 8)

'''

# input 等待输入（阻塞）
# age = input('请输入一个数字：')
# print('age = ', age)

'''
index = 0
count = 0
str1 = input('请输入一段英文:')
while index < len(str1):
    while str1[index] != " ":
        index += 1
        if index == len(str1):
            break
    count += 1

    if index == len(str1):
        break

    while str1[index] == " ":
        index += 1

# print(count)
'''






# 装饰器

# 复制一点的装饰器
def outer(func):
    def inner(age):
        if age < 0:
            age = 0
        func(age)
    return inner


@outer  #res = outer(say)
def say(age):
    print('Gao_sir is %d years old' % (age))

# res = outer(say)
say(22)



# 通用装饰器
def outer(func):
    def inner(*args, **kwargs):
        print('*****************')
        func(*args,**kwargs)
    return inner


@outer
def say(name,age):
    print('my name is %s,I am %d years old' % (name,age))


say('Gao_sir',22)









# 偏函数



# 异常处理
'''
try:
    语句一
except:
    表达式一
except:
    表达式二
else:
    没有错误的表达式



try:
    语句一
except:
    表达式一
except:
    表达式二
finally:
    都会执行的表达式

'''

# 断言
# assert



# 文件操作 读/写

# 打开文件
'''

open(path,flag[,encoding][,errors])
path:文件路径
flag:打开方式
encoding:编码方式
errors:错误处理

# 读文件
read
readline() 读取一行
readlines() 读取所有行


例子：
try:
    f = open('C:/XXX/XXX','r',encoding = 'utf-8')
    print(f.read())
finally:
    if f:
        f.close()



# 最简单方式
with open(path,'r',encoding='utf-8') as f:
    print(f.read())





# 写文件
f = open(path,'w',encoding='utf-8')

f.write('XXXXXXXXXXXXX')    #将信息写入缓存区
f.flush()           # 刷新缓存区，将缓存区数据写入文件

f.close()




'''




dehua = win32com.client.Dispatch('SAPI SPVOICE')
dehua.Speak('Gao_Sir is a talent')
