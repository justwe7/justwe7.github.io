# Next.js 项目结构与目录定义总结

## 1. 动态路由：中括号 `[ ]`
- **定义**：
  - 中括号表示动态路径参数，用于捕获 URL 中的动态部分。
  - 例如，`[locale]` 文件夹会捕获 `/en/home` 或 `/fr/home` 中的 `locale` 参数，其值分别为 `en` 和 `fr`。

- **使用示例**：
  ```plaintext
  app/
    ├── [locale]/
        ├── page.tsx  // 动态路径对应页面
        ├── layout.tsx  // 动态路径的布局组件
  ```

  ```typescript
  // app/[locale]/page.tsx
  export default function Page({ params }: { params: { locale: string } }) {
    return <div>当前语言是：{params.locale}</div>;
  }
  ```

---

## 2. 路由分组：小括号 `( )`
- **定义**：
  - 小括号用于逻辑分组，不会影响生成的 URL 路径。
  - 适合组织模块化代码，而不希望分组名出现在 URL 中。

- **使用示例**：
  ```plaintext
  app/
    ├── (marketing)/
        ├── about/
        ├── layout.tsx  // 作用于分组中的所有页面
        ├── page.tsx  // 映射到 `/`
    ├── (booking)/
        ├── page.tsx  // 映射到 `/`
  ```

  - URL 结果，最终会导致冲突：
    - `(marketing)/page.tsx` -> `/`
    - `(booking)/page.tsx` -> `/` 
- **注意事项**：
  - 分组文件夹不能直接包含页面文件，如 `page.tsx`，必须放在子文件夹中。

---

## 3. 静态路由
- **定义**：
  - 静态路由通过普通文件夹名定义，其路径直接映射到 URL。

- **使用示例**：
  ```plaintext
  app/
    ├── home/
        ├── page.tsx  // 映射到 `/home`
    ├── about/
        ├── page.tsx  // 映射到 `/about`
  ```

  - URL 结果：
    - `home/page.tsx` -> `/home`
    - `about/page.tsx` -> `/about`

---

## 4. 特殊文件命名
### 4.1 layout.tsx
- **作用**：定义文件夹下所有子页面的布局。

- **示例**：
  ```typescript
  // app/home/layout.tsx
  export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <header>Header 部分</header>
        <main>{children}</main>
        <footer>Footer 部分</footer>
      </div>
    );
  }
  ```

### 4.2 page.tsx
- **作用**：定义特定路径的页面内容。

- **示例**：
  ```typescript
  // app/home/page.tsx
  export default function Page() {
    return <h1>Home 页面</h1>;
  }
  ```

### 4.3 error.tsx
- **作用**：捕获特定路由的错误。

### 4.4 global-error.tsx
- **作用**：捕获全局未处理的错误。

### 4.5 api/
- **作用**：用于构建 API 路由。

- **示例**：
  ```plaintext
  app/
    ├── api/
        ├── hello/
            ├── route.ts
  ```
  ```typescript
  // app/api/hello/route.ts
  export async function GET(request: Request) {
    return new Response('Hello, world!');
  }
  ```

  - URL 结果：
    - `/api/hello` -> 返回 `Hello, world!`

---

## 5. 创建目录时的注意事项
1. **允许性**：
   - 可以在 `(marketing)` 或 `[locale]` 同级创建目录，比如 `home/page.tsx`。
   - 例如：
     ```plaintext
     app/
       ├── [locale]/
       ├── home/
           ├── page.tsx
       ├── (marketing)/
           ├── about/
     ```

2. **冲突检查**：
   - 如果不同目录使用相同路由名称（如多个 `home`），需确保路径不会冲突。

3. **最佳实践**：
   - 使用 `( )` 分组来隔离模块，例如：
     ```plaintext
     app/
       ├── (admin)/
           ├── home/
               ├── page.tsx
       ├── (marketing)/
           ├── home/
               ├── page.tsx
     ```
     - `admin` 和 `marketing` 分组中都有 `home`，但不会冲突。

---

## 6. 示例完整结构
```plaintext
app/
  ├── [locale]/
      ├── page.tsx
      ├── layout.tsx
  ├── (marketing)/
      ├── about/
          ├── page.tsx
      ├── layout.tsx
      ├── page.tsx
  ├── home/
      ├── page.tsx
      ├── layout.tsx
  ├── api/
      ├── hello/
          ├── route.ts
  ├── global-error.tsx
  ├── robots.ts
  ├── sitemap.ts
components/
  ├── Header.tsx
  ├── Footer.tsx
