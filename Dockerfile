FROM mhart/alpine-node:10 as parser

WORKDIR /scopus
COPY package.json /scopus
RUN npm install
COPY app /scopus
RUN node parser.js

FROM stain/jena-fuseki as database

LABEL MANTAINER="Andrés Suárez && Johan Hernández"
COPY --from=parser /scopus/output/parsed_scopus.json /staging/
COPY --from=parser /scopus/output/triples.ttl /staging/
ENV ADMIN_PASSWORD=123
ENV FUSEKI_DATASET=scopus
EXPOSE 3030