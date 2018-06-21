ARG NODE_VERSION=6
FROM node:${NODE_VERSION}

# Home directory for Node-RED application source code.
RUN mkdir -p /usr/src/node-red

# User data directory, contains flows, config and nodes.
RUN mkdir /data

WORKDIR /usr/src/node-red

# Add node-red user so we aren't running as root.
RUN useradd --home-dir /usr/src/node-red --no-create-home node-red \
    && chown -R node-red:node-red /data \
    && chown -R node-red:node-red /usr/src/node-red \
    && chown -R node-red:node-red /usr/local/lib

# ADD/Create folder of CHT Node Red Module
ADD node-red-cht /data/node-red-cht
RUN chown -R node-red:node-red /data/node-red-cht

USER node-red

# package.json contains Node-RED NPM module and node dependencies
COPY package.json /usr/src/node-red/
RUN npm install

# Using npm install to add cht module.
# In the directory containing the node’s module package.json file, run: sudo npm link.
RUN cd /data/node-red-cht && npm link 
# In your node-red user directory, typically ~/.node-red run: npm link <name of node module>.
RUN cd /usr/src/node-red && npm link node-red-contrib-CHT

RUN npm install is-utf8
RUN npm install mqtt

# User configuration directory volume
EXPOSE 1880

# Environment variable holding file path for flows configuration
ENV FLOWS=flows.json
ENV NODE_PATH=/usr/src/node-red/node_modules:/data/node_modules

CMD ["npm", "start", "--", "--userDir", "/data"]