# TDD FRONTNED





## Passo 1 - Separar responsabilidades

    UI  
        O que deve ser renderizado?
        Quais eventos são necessários?
        
    SERVICE 
        O que deve ser integrado?
        O que não é responsabilidade da  tela e deve ser encapsulado?

    STATE MANAGEMENT/BEHAVIOR
        Quais informações precisam ser gerenciadas?
        Quais comportamentos são esperados para implementar a funcionalidade?


## Passo 2 - Decidir como deve ser testado cada funcionalidade?
    Testes de Componente
        Testam a renderização do componente e os eventos de comunicação do componente

    Testes de Integração/camada de serviço
        Testam como a aplicação irá receber e enviar informações de/para outros sistemas
    
    Testes de Gerenciamento de estado e Comportamento
        Testam a manipulação dos dados e as mudanças de comportamento

    Testes de UI/E2E
        Testam o processo de ponta a ponta
        Testam que mesmo após novas implementações as funcionalidades pré existentes continuam funcionando adequadamente



## Passo 3 - Por onde começar os testes?

    1 - Começe pelos testes de Componentes
        Os testes de componente são os testes mais simples de serem implementados, eles validam a renderização básica do componente e os eventos disparados pelo componente

    2 - Implemente os testes da camada de serviço
        Esse tipo de teste normalmente se refere a comunicação e transformação de informação de informações de fora para dentro e de dentro para fora da aplicação. Um exemplo típico são as informações trafegadas entre o backend e o frontend.
    
    3 - Implemente os testes de modificação de estado e comportamento da aplicação de formar geral. Este tipo de teste permite ao desenvolvedor separar a UI da camada de dados.

    4 - Teste a inteface visual.

## Em que momento é implementado a estilização?
    A estilização de um componente normalmente é implementada em um processo manual e deve ser implementada durante o processo de documentação do componente. Este processo de documentação deve ser realizado asim que o teste de componente é finalizado. Para que isso seja realizado de forma adequada é importante que o projeto utilize ferramentas de documentação práticas e atualizadas.

