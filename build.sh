#!/bin/bash -ilex
###
 # @Description: 打包脚本 命令 ./build.sh pro|dev
 # @Author: 尚夏
 # @Date: 2021-08-09 13:58:25
 # @LastEditTime: 2022-02-21 15:33:44
 # @FilePath: /mining-admin-desktop/build.sh
### 

# step1 打包项目 npm run build --> dist
env=$1
echo ${env}
if [ "$system" = "linux" ]; then
# linu
  sed -i "6c \"env\": \"${env}\","  ./package.json
  sed -i "6c \"env\": \"${env}\","  ./electron/package.json
else
#  mac
  gsed -i "6c \"env\": \"${env}\","  ./package.json
  gsed -i "6c \"env\": \"${env}\","  ./electron/package.json
fi
npm run build-${env}

# npm run build

#step2 删除electr/dist 并且将最新的dist移动到electron下
rm -rf ./electron/dist
mv dist ./electron/

#step3 删除electron下之前打包生成的文件 package
rm -rf ./electron/package

#step4 取消签名(因为当前没有证书)
export CSC_IDENTITY_AUTO_DISCOVERY=false

#step5 打包mac
cd electron
npm run package-mac

#step6 打包win
npm run package-win64


#step7 恢复配置。
cd ..
if [ "$system" = "linux" ]; then
# linu
  sed -i "6c \"env\": \"dev\","  ./package.json
  sed -i "6c \"env\": \"dev\","  ./electron/package.json
else
#  mac
  gsed -i "6c \"env\": \"dev\","  ./package.json
  gsed -i "6c \"env\": \"dev\","  ./electron/package.json
fi