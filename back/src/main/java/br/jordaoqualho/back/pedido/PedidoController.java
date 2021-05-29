package br.jordaoqualho.back.pedido;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pedido")
public class PedidoController {
    @Autowired
    private PedidoService service; 
   

    @GetMapping
    public Page<Pedido> get(Pageable pageRequest,  @RequestParam(name = "termo",required = false) String termo) {
        System.out.println(">>>> [" + termo + "]");
        return service.obterTodos(pageRequest, termo);
    }
 
    @GetMapping("/{idParaEditar}")
    public Pedido getById(@PathVariable("idParaEditar") String idParaEditar) {
        return service.obterPeloId(idParaEditar);
    }

    @PutMapping("/{id}")
    public void put(@PathVariable String id, @RequestBody Pedido InspecaoEditado) {
        service.salvar(InspecaoEditado);
    }

    @PostMapping("/gerar-pedido")
    public String postGerarInspecaos() {
        service.gerarInspecaos();
        return "Inspecão gerada com sucesso!";
    }

    @PostMapping
    public String post(@RequestBody Pedido novo) {
        Pedido InspecaoSalvo = service.salvar(novo);
        return InspecaoSalvo.getId();
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.excluirPeloId(id);
    }
    
    @DeleteMapping("/excluir-todos")
    public void deleteAll() {
        service.excluirTodos();
    }


}