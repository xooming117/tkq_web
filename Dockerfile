FROM node

WORKDIR /opt/tkq/web

COPY . /opt/tkq/web

#RUN npm config set registry https://registry.npm.taobao.org

RUN npm install

# 暴露 3030 端口
#EXPOSE 3030

CMD ["npm", "run", "dev"]

