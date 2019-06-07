# build environment
FROM node:9.6.1 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app/
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
COPY ./vhosts/ /usr/src/app/vhosts/
RUN npm install --silent && npm install react-scripts@3.0.0 -g
COPY . /usr/src/app/
RUN npm run build
# production environment
FROM bitnami/nginx:latest
WORKDIR /opt/bitnami/nginx
COPY --from=builder /usr/src/app/build/ ./html/
COPY --from=builder /usr/src/app/vhosts/ ./vhosts/
USER 1001
ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "/run.sh" ]
