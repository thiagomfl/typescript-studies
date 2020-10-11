# Tipo de dado: void

***void*** é um pouco o oposto do tipo ***any***: é a ausência de qualquer tipo. Normalmente você pode ver isso como o tipo de retorno de funções que não retornam um valor:

```typescript
function warnUser(): void {
  console.log('Esta é a minha mensagem de aviso');
}
```

Declarar variáveis do tipo ***void*** não é útil porque você só pode atribuir nulo (apenas se ***--strictNullChecks*** não for especificado) ou indefinido a eles:

```typescript
let unusable: void = undefined;
// OK se `--strictNullChecks` não for fornecido
unusable = null;
```
