FROM php:fpm-stretch

# Setup necessary env vars
ENV DEBIAN_FRONTEND=noninteractive
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# Basic Prep
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl supervisor

# Setup locales
RUN apt-get install -y --no-install-recommends locales
COPY locale/default /etc/default/locale
COPY locale/locale.gen /etc/locale.gen
RUN locale-gen

# PHP dependencies
RUN apt-get install -y --no-install-recommends \
    zlib1g-dev libicu-dev build-essential libcurl4-openssl-dev \
    && docker-php-ext-install -j$(nproc) intl \
    && docker-php-ext-install -j$(nproc) mbstring \
    && docker-php-ext-install -j$(nproc) curl \
    && docker-php-ext-install gettext \
    && apt-get remove -y --purge zlib1g-dev libicu-dev build-essential libcurl4-openssl-dev \
    && apt-get autoremove -y --purge

# Halcyon
RUN apt-get install -y --no-install-recommends git \
    && git clone https://notabug.org/halcyon-suite/halcyon.git /var/www/html/ \
    && git checkout `git describe --tags` \
    && cp -r /var/www/html/config /var/www/html/config.example \
    && chown -R www-data: /var/www

# PHP-fpm + nginx
RUN apt-get install -y --no-install-recommends nginx \
# Remove (some of the) default nginx config
    && rm -f /etc/nginx.conf \
    && rm -f /etc/nginx/conf.d/default.conf \
    && rm -rf /etc/nginx/sites-* \
    && rm -rf /var/log/nginx \
# Ensure nginx logs, even if the config has errors, are written to stderr
    && mkdir -p /var/log/nginx \
    && chown www-data: /var/log/nginx \
    && ln -s /dev/stderr /var/log/nginx/error.log \
# Create folder where the user hook into our default configs
    && mkdir -p /etc/nginx/server.d/ \
    && mkdir -p /etc/nginx/location.d/ \
# Bring php-fpm configs into a more controallable state
    && rm /usr/local/etc/php-fpm.d/www.conf.default \
    && mv /usr/local/etc/php-fpm.d/docker.conf /usr/local/etc/php-fpm.d/00-docker.conf \
    && mv /usr/local/etc/php-fpm.d/www.conf /usr/local/etc/php-fpm.d/10-www.conf \
    && mv /usr/local/etc/php-fpm.d/zz-docker.conf /usr/local/etc/php-fpm.d/20-docker.conf

# Copy necessary configs
ADD etc/ /etc/
ADD usr/ /usr/

EXPOSE 80

ENTRYPOINT ["/usr/bin/supervisord","-c","/etc/supervisord.conf"]

