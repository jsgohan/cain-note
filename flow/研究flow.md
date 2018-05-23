### 需要深入研究

- Type Aliases

- Opaque Type Aliases

- Generic Types

- Union Types

  如果遇到一种情况—response返回的数据类型分为{success: true, value: false} 和{success: false, error: 'Bad request'}

  此时 如果如下：

  ```
  // @flow
  type Response = {
    success: boolean,
    value?: boolean,
    error?: string
  };
  
  function handleResponse(response: Response) {
    if (response.success) {
      // $ExpectError
      var value: boolean = response.value; // Error!
    } else {
      // $ExpectError
      var error: string = response.error; // Error!
    }
  }
  ```

  将两个结构的type都定义在一个对象内，就会报错，需要分成两个对象

  ```
  // @flow
  type Success = { success: true, value: boolean };
  type Failed  = { success: false, error: string };
  
  type Response = Success | Failed;
  
  function handleResponse(response: Response) {
    if (response.success) {
      var value: boolean = response.value; // Works!
    } else {
      var error: string = response.error; // Works!
    }
  }
  ```

  这是因为在flow中，只允许对象的属性大于对象type，相反不允许

  然而，如果如下：

  ```
  // @flow
  type Success = { success: true, value: boolean };
  type Failed  = { error: true, message: string };
  
  function handleResponse(response:  Success | Failed) {
    // ...
  }
  
  handleResponse({
    success: true,
    error: true,
    value: true,
    message: 'hi'
  });
  ```

  此时，flow无法区分要用哪个对象type去匹配，也会报错。需要利用exact object types

  ```
  // @flow
  type Success = {| success: true, value: boolean |};
  type Failed  = {| error: true, message: string |};
  
  type Response = Success | Failed;
  
  function handleResponse(response: Response) {
    if (response.success) {
      var value: boolean = response.value;
    } else {
      var message: string = response.message;
    }
  }
  ```

  用exact object types后，flow不允许添加附加的属性，因此就不会发生冲突

- 

