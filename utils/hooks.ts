import { TEXTURETYPE_RGBP, Asset, Application } from "playcanvas"
import { useApp } from "@playcanvas/react/hooks"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAsset } from "@playcanvas/react/utils"
import { useCallback, useLayoutEffect } from "react";

type AssetHookResult = {
    data: Asset | undefined;
    isPending: boolean;
    release: () => void;
}

/**
 * react-queryを使用してアセットを読み込む
 * 
 * @param {string} src - テクスチャアセットのURL
 * @param {string} type - アセットタイプ
 * @param {Object} [props] - アセットローダーに渡す追加プロパティ
 * @returns {{ data: Asset, isPending: boolean, release: Function}} - テクスチャアセットとその読み込み状態
 */
export const useAsset = (src: string, type: string, props?: Record<string, unknown>): AssetHookResult => {
    const app = useApp() as Application;
    const queryClient = useQueryClient();
    const queryKey = [app.root?.getGuid(), src, type, props];

    // アセット用のクエリを構築
    const query = useQuery({ 
        queryKey,
        queryFn: () => app && fetchAsset(app, src, type, props)
    });

    // クエリをキャッシュから削除する`release`を作成
    const release = useCallback(() => {  
        queryClient.removeQueries({ queryKey });
    }, [queryClient, ...queryKey]);

    // クエリが削除されたとき、対応するリソースを削除
    useLayoutEffect(() => {
        const unsubscribe = queryClient.getQueryCache().subscribe(({ type, query }) => {
            if (type === "removed") {
                const asset = query.state?.data as Asset;
                asset?.unload();
            }
        });
        return unsubscribe;
    }, [queryClient])

    return { ...query, release } as AssetHookResult;
}

/**
 * テクスチャアセットを環境アトラスとして読み込む
 * 
 * @param {string} src - テクスチャアセットのURL
 * @param {Object} [props] - アセットローダーに渡す追加プロパティ
 * @returns {{ data: Asset, isPending: boolean, release: Function }} - テクスチャアセットとその読み込み状態
 */
export const useEnvAtlas = (src: string, props?: Record<string, unknown>): AssetHookResult => useAsset(src, 'texture', { 
    ...props, 
    type: TEXTURETYPE_RGBP, mipmaps: false
});
  
export const useSplat = (src: string, props?: Record<string, unknown>): AssetHookResult => useAsset(src, 'gsplat', props);

/**
 * GLBアセットを読み込む
 * 
 * @param {string} src - GLBファイルのURL
 * @param {Object} [props] - アセットローダーに渡す追加プロパティ
 * @returns {{ data: Asset, isPending: boolean, release: Function }} - GLBアセットとその読み込み状態
 */
export const useModel = (src: string, props?: Record<string, unknown>): AssetHookResult => useAsset(src, 'container', props);