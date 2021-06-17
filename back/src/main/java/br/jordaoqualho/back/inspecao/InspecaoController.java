package br.jordaoqualho.back.inspecao;



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
@RequestMapping("/api/inspecao")
public class InspecaoController {
    @Autowired
    private InspecaoService service; 
   

    @GetMapping
    public Page<Inspecao> get(Pageable pageRequest,  @RequestParam(name = "termo",required = false) String termo) {
        return service.obterTodos(pageRequest, termo);
    }
 
    @GetMapping("/{idParaEditar}")
    public Inspecao getById(@PathVariable("idParaEditar") String idParaEditar) {
        return service.obterPeloId(idParaEditar);
    }

    @PutMapping("/{id}")
    public void put(@PathVariable String id, @RequestBody Inspecao InspecaoEditado) {
        service.salvar(InspecaoEditado);
    }

    @PostMapping
    public String post(@RequestBody Inspecao novo) {
        Inspecao InspecaoSalvo = service.salvar(novo);
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