package santiago.portfolio.demo.Mappers;

import java.util.List;
import java.util.function.Function;

public class ListMappers {
    public static <T, R> List<R> toDto(List<T> entity, Function<T,R> mapper){
        return entity.stream().map(mapper).toList();
    }
}
