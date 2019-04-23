## Scopus Final Project

## Hecho con

- Fuseki
- Sparql
- Nodejs

## Instalación

Construye la imagen

```
docker build -t scopus-image .
```

Corre un contenedor a partir de la imagen creada

```
docker run -d -p 8080:3030 --name scopus-project scopus-image
```

Entra al contenedor

```
docker exec -it scopus-project /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"
```

Y carga el dataset

```
sh load.sh ${FUSEKI_DATASET} triples.ttl
```

## ¿Cómo usarlo?

Entra a Fuseki en http://localhost:8080, ya en Fuseki, vaya a "Manage datasets", haga clic en "Add new dataset", marque "Persistent" y proporcione el nombre de la base de datos exactamente como se proporciona a load.sh, en nuestro caso seria la variable \${FUSEKI_DATASET} que es igual a "scopus"

Ahora vaya a Dataset, seleccione el menú desplegable y pruebe "Info and Query".
