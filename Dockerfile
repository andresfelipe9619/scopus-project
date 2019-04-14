FROM stain/jena-fuseki
LABEL say=WOW

COPY ./app/output/document.ttl /usr/src/app
ENV ADMIN_PASSWORD=123
ENV FUSEKI_DATASET=scopus
EXPOSE 3030
CMD /bin/bash