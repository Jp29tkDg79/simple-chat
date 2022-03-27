FROM mongo

ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin

ENV TZ=Asia/Tokyo
RUN echo $TZ > /etc/timezone

CMD [ "mongod", "--auth" ]