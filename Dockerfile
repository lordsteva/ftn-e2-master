FROM node:14 as base
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./
# Package @team21/web-shop-actions
FROM base as team21_web-shop-actions-build
WORKDIR /app/apps/web-shop-back/actions
COPY  apps/web-shop-back/actions/package.json ./
WORKDIR /app/
RUN npx lerna bootstrap --scope=@team21/web-shop-actions --includeDependencies
WORKDIR /app/apps/web-shop-back/actions
RUN npm run build
# Package @team21/web-shop2-actions
FROM base as team21_web-shop2-actions-build
WORKDIR /app/apps/web-shop-back2/actions
COPY  apps/web-shop-back2/actions/package.json ./
WORKDIR /app/
RUN npx lerna bootstrap --scope=@team21/web-shop2-actions --includeDependencies
WORKDIR /app/apps/web-shop-back2/actions
RUN npm run build
# Package @team21/ui-components
FROM base as team21_ui-components-build
WORKDIR /app/packages/ui-components
COPY  packages/ui-components/package.json ./
WORKDIR /app/
RUN npx lerna bootstrap --scope=@team21/ui-components --includeDependencies
WORKDIR /app/packages/ui-components
# Package @team21/types
FROM base as team21_types-build
WORKDIR /app/packages/types
COPY  packages/types/package.json ./
WORKDIR /app/
RUN npx lerna bootstrap --scope=@team21/types --includeDependencies
WORKDIR /app/packages/types
# Package @team21/bank-provider
FROM base as team21_bank-provider-build
WORKDIR /app/apps/bank-provider
COPY  apps/bank-provider/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/bank-provider --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/apps/bank-provider
RUN npm run build
# Package @team21/paypal-provider
FROM base as team21_paypal-provider-build
WORKDIR /app/apps/paypal-provider
COPY  apps/paypal-provider/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/paypal-provider --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/apps/paypal-provider
RUN npm run build
# Package @team21/bank2
FROM base as team21_bank2-build
WORKDIR /app/apps/bank2
COPY  apps/bank2/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/bank2 --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/apps/bank2
RUN npm run build
# Package @team21/bank
FROM base as team21_bank-build
WORKDIR /app/apps/bank
COPY  apps/bank/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/bank --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/apps/bank
RUN npm run build
# Package @team21/psp-front
FROM base as team21_psp-front-build
WORKDIR /app/apps/psp
COPY  apps/psp/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/psp-front --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/apps/psp
RUN npm run build
# Package @team21/pcc
FROM base as team21_pcc-build
WORKDIR /app/apps/pcc
COPY  apps/pcc/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/pcc --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/apps/pcc
RUN npm run build
# Package @team21/web-shop-front
FROM base as team21_web-shop-front-build
WORKDIR /app/apps/web-shop-front
COPY  apps/web-shop-front/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/web-shop-front --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/apps/web-shop-front
RUN npm run build
# Package @team21/web-shop-front2
FROM base as team21_web-shop-front2-build
WORKDIR /app/apps/web-shop-front2
COPY  apps/web-shop-front2/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/web-shop-front2 --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/apps/web-shop-front2
RUN npm run build
# Package @team21/eslint-config-react
FROM base as team21_eslint-config-react-build
WORKDIR /app/packages/eslint-config-react
COPY  packages/eslint-config-react/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/eslint-config-react --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/packages/eslint-config-react
# Package @team21/eslint-config-typescript
FROM base as team21_eslint-config-typescript-build
WORKDIR /app/packages/eslint-config-typescript
COPY  packages/eslint-config-typescript/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/eslint-config-typescript --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/packages/eslint-config-typescript
# Package @team21/prettier-config
FROM base as team21_prettier-config-build
WORKDIR /app/packages/prettier-config
COPY  packages/prettier-config/package.json ./
WORKDIR /app/
COPY --from=team21_ui-components-build /app/packages/ui-components/package.json /app/packages/ui-components/
RUN npx lerna bootstrap --scope=@team21/prettier-config --includeDependencies
COPY --from=team21_ui-components-build /app/packages/ui-components/ /app/packages/ui-components/
WORKDIR /app/packages/prettier-config
# final stage
FROM base
COPY --from=team21_web-shop-actions-build /app/apps/web-shop-back/actions /app/apps/web-shop-back/actions
COPY --from=team21_web-shop2-actions-build /app/apps/web-shop-back2/actions /app/apps/web-shop-back2/actions
COPY --from=team21_ui-components-build /app/packages/ui-components /app/packages/ui-components
COPY --from=team21_types-build /app/packages/types /app/packages/types
COPY --from=team21_bank-provider-build /app/apps/bank-provider /app/apps/bank-provider
COPY --from=team21_paypal-provider-build /app/apps/paypal-provider /app/apps/paypal-provider
COPY --from=team21_bank2-build /app/apps/bank2 /app/apps/bank2
COPY --from=team21_bank-build /app/apps/bank /app/apps/bank
COPY --from=team21_psp-front-build /app/apps/psp /app/apps/psp
COPY --from=team21_pcc-build /app/apps/pcc /app/apps/pcc
COPY --from=team21_web-shop-front-build /app/apps/web-shop-front /app/apps/web-shop-front
COPY --from=team21_web-shop-front2-build /app/apps/web-shop-front2 /app/apps/web-shop-front2
COPY --from=team21_eslint-config-react-build /app/packages/eslint-config-react /app/packages/eslint-config-react
COPY --from=team21_eslint-config-typescript-build /app/packages/eslint-config-typescript /app/packages/eslint-config-typescript
COPY --from=team21_prettier-config-build /app/packages/prettier-config /app/packages/prettier-config